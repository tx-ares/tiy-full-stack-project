import Backbone from 'backbone'

//We will individually export each const variable here. Why not use export default?  Because we are exporting more than one thing.  
export const TweetModel = Backbone.Model.extend({
	url: "/api/tweets"
})

export const TweetCollection = Backbone.Collection.extend({
	url: "/api/tweets"
})
