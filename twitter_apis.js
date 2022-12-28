const needle = require('needle')
require('dotenv').config()

const token = process.env.BEARER_TOKEN

const findUserIdURL = 'https://api.twitter.com/2/users/by/username/web3_devv'
const userFollowersListURL =
  'https://api.twitter.com/2/users/994622283133128706/followers'
const retweetedByURL =
  'https://api.twitter.com/2/tweets/1607826383585124355/retweeted_by'
const likedUsersURL =
  'https://api.twitter.com/2/tweets/1607826383585124355/liking_users'

/**
 * Things to note...
 * Data provided by twitter is in pagination format. There is a limit on how much data twitter provides for each api call. More reasearch needed here.
 * For demo, userID, tweetID are hard coded in api urls. But these things need to replaced by the data that you want to test aganist with.
 */

//-------- Steps to find if user is following a specific account or not? ---------//
/**
 *  1. Get the userID that you want to check using 'findUserId' method which makes use of 'findUserIdURL' api. => extract the userID from the reponse.
 *  2. Make a call to 'userFollowersListURL' api which returns the list of followed users to the ID passed in the url. This id might be the company ID.
 *  3. Now check the 'userID' received in the first step is present inside the list of users in the second step or not.
 *  4. If yes, that means userID is following the passed company ID. (follow verified)
 *  5. If not, userID is not followinf the passed company ID. (follow unverified)
 */

//-------- Steps to find whether the tweet is retweeted by the userID ot not. ---------//
/**
 * 1. Get the userID that you want to check using 'findUserId' method which makes use of 'findUserIdURL' api. => extract the userID from the reponse.
 * 2. Make a call to 'retweetedByURL' api to fetch the list of users who retweeted the specific tweet. (tweet can identified with tweetID)
 * 3. Now check whether the userID received in the first step if present inside the list received in the second step.
 * 4. IF yes, that means user(userID) retweeted the tweet(tweetId).(retweet verified)
 * 5. If not, that means user(userID) not retweeted the tweet(tweetId)(retweet not verified)
 *
 *
 * Steps are same to find whether the tweet is liked by the userID ot not. Just change the API url.
 */

async function makeRequest(method, apiURL) {
  const params = {}

  // this is the HTTP header that adds bearer token authentication
  const res = await needle('get', apiURL, params, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  if (res.body) {
    return res.body
  } else {
    throw new Error('Unsuccessful request')
  }
}

const findUserId = async () => {
  console.log('fetching userID...')
  try {
    // Make request
    const response = await makeRequest('get', findUserIdURL)
    console.dir(response, {
      depth: null,
    })
    //userID can be extracted and passed to the below function
    getFollowersList()
  } catch (e) {
    console.log(e)
    process.exit(-1)
  }
}

const getFollowersList = async () => {
  console.log('fetching followers list....')
  try {
    // Make request
    const response = await makeRequest('get', userFollowersListURL)
    console.dir(response, {
      depth: null,
    })
    //tweetID can passed to below function for which you want to test aginist.
    getRetweetedUserList()
  } catch (e) {
    console.log(e)
    process.exit(-1)
  }
}

const getRetweetedUserList = async () => {
  console.log('fetching retweeted user list....')
  try {
    // Make request
    const response = await makeRequest('get', likedUsersURL)
    console.dir(response, {
      depth: null,
    })
    getLikedUserList
  } catch (e) {
    console.log(e)
    process.exit(-1)
  }
}

const getLikedUserList = async () => {
  console.log('fetching liked user list....')
  try {
    // Make request
    const response = await makeRequest('get', retweetedByURL)
    console.dir(response, {
      depth: null,
    })
  } catch (e) {
    console.log(e)
    process.exit(-1)
  }
}

const main = () => {
  findUserId()
}
main()
