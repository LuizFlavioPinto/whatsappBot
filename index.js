const puppeteer = require("puppeteer")

let sendMessage = async (contactName, typeOfMessage, amountOfMessages, message) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");

  await page.waitForSelector(`span[title='${contactName}']`)
  await page.click(`span[title='${contactName}']`);

  const editor = await page.$("div[data-tab='6']");
  await editor.focus();

  const functions = {
    normalMessage () {
      message = message
    },
    repeater () {
      let messages = document.querySelectorAll('span._3-8er.selectable-text.copyable-text > span')
      message = messages[messages.length - 1].innerText
    },
    randomFlood() {
      let characters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p',
      'q','r','s','t','u','v','w','x','y','z','ç','!','@','#','$','%','¨','&','*','(',')',
      '-','_','+','=','`','´','[',']','{','}','^','~',',','<','.','>',':',';','/','?','°',
      '¹','²','³','£','¢','¬'];
    
      function randomWord() {
        let generatedNumber = Math.floor(Math.random() * ((characters.length - 1) - 0) + 0)
        return generatedNumber
      }
    
      message = ''
      
      for(let i = 0; i < 844; i++){
        message += characters[randomWord()]
      }  
    }
  }
  
  for (let i = 0; i < amountOfMessages; i++) {
    if(typeOfMessage == 'normalMessage')functions.normalMessage()
    if(typeOfMessage == 'randomFlood')functions.randomFlood()

    await page.keyboard.sendCharacter(message);
    await page.click("span[data-testid='send']");
  }
}

sendMessage('Fernando', 'normalMessage', 1000, 'Hello')