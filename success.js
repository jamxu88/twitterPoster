const Discord = require('discord.js');
const client = new Discord.Client();
const request = require(`request`);
const fs = require(`fs`);
const Twitter = require('twitter')
//const delay = require('delay')
client.login('')
var twclient = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });
var filename = ""
var lastTweetId = "";
client.on('ready', () => {
    console.log("Client: "+client.user.username)
    client.user.setActivity("Waifu Tools Success", {
        type: "WATCHING",
        url: ""
    });
})

client.on('message', async (message) => {
    if(message.channel.id != "" || message.author.bot ||message.author.id == client.user.id) return;
    if(message.attachments.first()) {
        console.log(message.attachments.first().name)
        if(message.attachments.first().name.slice(-4) === `.png`) {
            await downloadpng(message.attachments.first().url)
            filename = "temp.png"
            tweet()
            await message.channel.send({embed:{
                color: 16225049,
                title: 'Success Posted!',
                description: 'React with ❌ to delete.',
                footer: {
                    "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                    "text": "Fuchsia Tools"
                }
            }}).then(sentMessage => {
                sentMessage.react('❌')
                sentMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌'),
                {max: 1, time: 20000 }).then(collected => {
                  if (collected.first().emoji.name == '❌') {
                    try {
                        deltweet()
                    }catch(error) {
                        console.log(error)
                    }
                    sentMessage.edit({embed:{
                        color: 16225049,
                        title: 'Success Deleted.',
                        footer: {
                            "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                            "text": "Fuchsia Tools"
                        }
                    }})
                  }else {
                    awaitReactions(message);
                  }
                })
            })
        }else
        if(message.attachments.first().name.slice(-4) === `.jpg`) {
            await downloadjpg(message.attachments.first().url)
            filename = "temp.jpg"
            tweet()
            await message.channel.send({embed:{
                color: 16225049,
                title: 'Success Posted!',
                description: 'React with ❌ to delete.',
                footer: {
                    "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                    "text": "Fuchsia Tools"
                }
            }}).then(sentMessage => {
                sentMessage.react('❌')
                sentMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌'),
                {max: 1, time: 20000 }).then(collected => {
                  if (collected.first().emoji.name == '❌') {
                    try {
                        deltweet()
                    }catch(error) {
                        console.log("error")
                    }
                    sentMessage.edit({embed:{
                        color: 16225049,
                        title: 'Success Deleted.',
                        footer: {
                            "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                            "text": "Fuchsia Tools"
                        }
                    }})
                  }else {
                    awaitReactions(message);
                  }
                })
            })
        }else
        if(message.attachments.first().name.slice(5) === `.jpeg`) {
            await downloadjpeg(message.attachments.first().url)
            filename = "temp.jpeg"
            tweet()
            await message.channel.send({embed:{
                color: 16225049,
                title: 'Success Posted!',
                description: 'React with ❌ to delete.',
                footer: {
                    "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                    "text": "Fuchsia Tools"
                }
            }}).then(sentMessage => {
                sentMessage.react('❌')
                sentMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌'),
                {max: 1, time: 20000 }).then(collected => {
                  if (collected.first().emoji.name == '❌') {
                    try {
                        deltweet()
                    }catch(error) {
                        console.log(error)
                    }
                    sentMessage.edit({embed:{
                        color: 16225049,
                        title: 'Success Deleted.',
                        footer: {
                            "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                            "text": "Fuchsia Tools"
                        }
                    }})
                  }else {
                    awaitReactions(message);
                  }
                })
            })
        }else
        if(message.attachments.first().name.slice(-5) === `.heic`) {
            await downloadjpeg(message.attachments.first().url)
            filename = "temp.heic"
            tweet()
            await message.channel.send({embed:{
                color: 16225049,
                title: 'Success Posted!',
                description: 'React with ❌ to delete.',
                footer: {
                    "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                    "text": "Fuchsia Tools"
                }
            }}).then(sentMessage => {
                sentMessage.react('❌')
                sentMessage.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌'),
                {max: 1, time: 20000 }).then(collected => {
                  if (collected.first().emoji.name == '❌') {
                    try {
                        deltweet()
                    }catch(error) {
                        console.log(error)
                    }
                    sentMessage.edit({embed:{
                        color: 16225049,
                        title: 'Success Deleted.',
                        footer: {
                            "icon_url": "https://cdn.discordapp.com/attachments/807039575813128243/810571026860736582/FuchsiaSmallEmote.png",
                            "text": "Fuchsia Tools"
                        }
                    }})
                  }else {
                    awaitReactions(message);
                  }
                })
            })
        }
    }
})


async function downloadpng(url) {
    await new Promise((resolve,reject) => {
        console.log('png')
         request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('temp.png'))
            .on('finish', () => {
                console.log('downloaded');
                resolve()
            })
            .on('error', (error) => {
                reject(error)
            })
    })
    
}
async function downloadjpg(url) {
    await new Promise((resolve,reject) => {
        console.log('jpg')
         request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('temp.jpg'))
            .on('finish', () => {
                console.log('downloaded');
                resolve()
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}
async function downloadjpeg(url) {
    await new Promise((resolve,reject) => {
        console.log('jpeg')
         request.get(url)
            .on('error', console.error)
            .pipe(fs.createWriteStream('temp.jpeg'))
            .on('finish', () => {
                console.log('downloaded');
                resolve()
            })
            .on('error', (error) => {
                reject(error)
            })
    })
}
async function tweet() {
    console.log(filename)
    var data = await fs.readFileSync(filename);
    //console.log(data)
    twclient.post('media/upload', {media: data}, function(error, media, response) {
        if (!error) {
            console.log("Successfully uploaded. "+media);
            console.log(media)
            var status = {
                status: "Success by ",
                media_ids   : media.media_id_string
            }
            console.log("About to tweet")
            twclient.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                    console.log('Tweeted.')
                    lastTweetId = tweet.id_str
                    console.log(tweet);
                }else {
                    console.log('Error')
                }
            });

        }else {
            console.log(error)
        }
    });
}

function deltweet() {
    console.log(lastTweetId)
    twclient.post('statuses/destroy', {id:lastTweetId}, function(error,response) {
        if(!error) {
            console.log(response)
        }else {
            console.log(error)
        }
    }) 
}