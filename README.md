## Heroku steps

    heroku login
    heroku create twitterapi-daemon
    git push -f heroku master
    heroku ps:scale web=1
    heroku logs --tail


	db['user-names_copy'].aggregate(
	    {$match:{"country" : {$exists:true}}},
	    {$group:{_id:"$country", "count": {$sum:1}}}
	).result;

	db['twitter-status'].ensureIndex({
		'screen_name' : 1, 'year' : 1, 'month' : 1, 'day' : 1
	}, {
		unique : true, 
		dropDups : true
	});
