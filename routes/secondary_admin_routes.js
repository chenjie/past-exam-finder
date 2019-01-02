const express = require('express');
const router = express.Router();

const Comments = require('../models/comments');
const Solution = require('../models/solution');

const { check } = require('express-validator/check');
const { ObjectID } = require('mongodb')
var fs = require('fs');

const log = console.log;

// admin route
router.get('/', function(req, res){
    res.send('<h1>You are in admin route.</h1>');
});

router.get('/pt-comments/:id', function(req,res){
    // ObjectId("5c04cb6c51c47834440302f2")
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Solution.findById(id).then((solution) =>{
        if (!solution) {
            res.status(404).send()
        } else {

            res.render('pt-comments_admin', {
                title: 'Solution and Comments',
                css: ['pt_comments.css'],
                js: ['pt_comments_admin.js', 'navbarNeedLogin.js'],
                comments: solution.comments
            });
        }
    })
	
})

router.get('/solution-data/:id', function(req,res){
    // ObjectId("5c04c0221c5efe3b585affc5")
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

    Solution.findById(id).then((solution) =>{
        if (!solution) {
            res.status(404).send()
        } else {
            res.send([solution.file]);
        }
    })
    
})


router.post('/pt-comments/:id', function(req,res){

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send()
    }

	var username, context;
	var errors = [];

	if(!req.isAuthenticated()){
        const login_error =  { 
            msg: 'Please login before leaving your comments.',
            value: '' };
        errors.push(login_error);

    } else{
    	username = req.user.username.split('@')[0];
    	context = req.body.context;

        // Validate fields
        req.checkBody('context', 'Context of comments is required.').notEmpty();

        errors = req.validationErrors();

    }

    if (errors) {

        Solution.findById(id).then((solution) => {

            if(!solution){
                res.status(404).send()
            } else{

                res.render('pt-comments', {
                    title: 'Solution and Comments',
                    css: ['pt_comments.css'],
                    js: ['pt_comments.js', 'navbarNeedLogin.js'],
                    comments: solution.comments,
                    errors: errors,
                    // solutionID: id
                    url: "/user/pt-comments/" + id
                });
            }
            
        }, (error) =>{
            res.status(400).send(error);
        })

    } else{

        Solution.findByIdAndUpdate(id, {$push: {comments: {username, context}}}, {new: true}).then((solution) => {
            if (!solution) {
                res.status(404).send();
            } else {
                req.flash('success_msg', 'You have successfully left your comments.');
                res.redirect('/user/pt-comments/' + id);
            }
        }).catch((error) => {
            res.status(400).send();
        })
    }
})


router.delete('/delete-comments/:id/:commentId', function(req, res){
	const id = req.params.id;
	const commentId = req.params.commentId;

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (!ObjectID.isValid(commentId)) {
		return res.status(404).send();
	}

	Solution.findOneAndUpdate(
		{_id: id},{ $pull: { comments: { _id: commentId }}}
	).then((solution) => {
		if (!solution) {
			res.status(404).send();
		} else {
			var found = false
			solution.comments.forEach(comments =>{
				if(!comments){
					res.status(404).send();
				} else{
					if(comments._id == commentId){
						found = true;

						Solution.findById(id).then((soln) =>{
							const sentDeletionInfo = {
								comments: comments, 
								soln
							};
							res.send(sentDeletionInfo);
						})
					}
				}
			})
			if(!found){
				res.status(404).send();
			}
		}
		
	}).catch((error) => {
		res.status(400).send(error);
	})

})

module.exports = router;