import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {TweetModel} from './models.js'

const TweetView = React.createClass({
	
	getInitialState: function(){
		return {
			tweetColl: this.props.tweetColl
		}
	},

	componentWillMount: function(){
			this.state.tweetColl.on('sync', () => {
			this.setState({
				tweetColl: this.state.tweetColl
			})
		})
	},

	render: function() {
		console.log('TweetView rendering')
		return(
				<div>
					<Header />
					<Composer tweetColl = {this.state.tweetColl}/>
				{/*Here we pass down props from our top level component, TweetView.  See app.js . */}
					<TweetContainer tweetColl={this.props.tweetColl}/> 
				</div>
			)
	}

})

const Header = React.createClass({
	render: function() {
		return (
			<div className="title">
				<h1>Chipper<i className="fa fa-twitter"></i></h1>
			</div>
		)
	}
})

const Composer = React.createClass({
	_submitTweet: function(evt){
		evt.preventDefault() // the Form is our event object (evt) here .  It has a built in function that will refresh the page once a submit is made.  We don't want this here, so we will prevent that.
		var tweetMod = new TweetModel({
			userHandle: evt.target.username.value,
			content: evt.target.textarea.value
		})
		tweetMod.save() // Add tweet to collection
		this.props.tweetColl.add(tweetMod)
	},

	render: function() {
		return (
				<div className="composer">
					<form onSubmit={this._submitTweet}>
						<input  name="username" placeholder="Enter your username" type="text" />
						<textarea name="textarea" placeholder="Type a cheep!" />
						<button type="submit">Submit</button>
					</form>
				</div>
			)

	}
})


const TweetContainer = React.createClass({
	render: function(){
		return(
			<div className="tweetContainer">
				{/* This is going to iterate over our collection and mount each model into the component, Tweet. */}
				{this.props.tweetColl.map((model) => {
					return <Tweet key={model.cid} model={model} />
				})}
			</div>
		)	
	}
})

const Tweet = React.createClass({
	render: function(){
		return(
			<div id={this.props.model.get('_id')}>
				<div className="tweet">
					<p>{this.props.model.get('userHandle')} says: {this.props.model.get('content')}</p>
				</div>
			</div>
			)
	}
})

//Only exporting one component so export default is okay here.
export default TweetView