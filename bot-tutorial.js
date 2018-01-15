// Tutorial
const BOT_ACCOUNT_NAME = ''
const BOT_ACCOUNT_WIF = ''
const DELAY = 30000
const FRIEND_LIST = ['sam', 'fred', 'sarah', 'lucy']

let streamComments = steem.api.streamTransactions('head', function(err, result) {
  let txType = result.operations[0][0]
  let txData = result.operations[0][1]

     if(txType == 'comment')
        checkAuthor(txData)
     }
});

function checkAuthor(txData){
  if (txData.parent_author == '' &&  isFriend(txData.author)){
    sendVote(txData.author, txData.permlink)
  }
}

function isFriend(name){
  return (FRIEND_LIST.indexOf(name) > -1);
}

function sendVote(author, permlink){

  setTimeout( () => {
    steem.broadcast.vote(BOT_ACCOUNT_WIF, BOT_ACCOUNT_NAME, author, permlink, 10000, function(err, result) {

      resolve(result);
    });
  }, i * DELAY )
}
