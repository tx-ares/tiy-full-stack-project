import React from 'react'
import ReactDOM from 'react-dom'
import {TweetCollection} from './models.js'
import TweetView from './tweetView.js'

import Backbone from 'backbone'

const app = function() {

	const TweetRouter = Backbone.Router.extend({
		routes: {
			'home' : '_showAllTweets',
			'*default' : '_redirect'
		},

		_showAllTweets: function(){
			var coll = new TweetCollection()
			coll.fetch()
			ReactDOM.render(<TweetView tweetColl={coll}/>, document.querySelector('.container'))
		},
		//Our catch all/ default will redirect hash, which triggers a hash change... which triggers Router initialize, which then sends us home.
		_redirect: function(){
			location.hash = 'home'
		},
		//Begins our hash listening.
		initialize: function(){
			Backbone.history.start()
		}
	})

	var rtr = new TweetRouter()
}


app()