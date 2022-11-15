# UCB Music - A music bot template for discord
---

## How to get started

1. Create a new Discord Application
	- Log in to the [Discord Developer Portal](https://discord.com/developers/applications) with your usual Discord Login credentials.
	- Use the **New Application** Button in the top right. ![new application screenshot](assets/screenshots/Discord-Developer-Portal-—-My-Applications.png)
	- Name your application and agree to the terms of service and policy.
	- Navigate to the **Bot** settings tab. ![bot tab screenshot](assets/screenshots/Discord-Developer-Portal-—-Bot-Settings-Tab.png)
	- Use the **Add Bot** button. ![add bot screenshot](assets/screenshots/Discord-Developer-Portal-—-Add-A-Bot.png)
	- Make the bot **private** or leave it public. This depends on your future plans. ![private bot screenshot](assets/screenshots/Discord-Developer-Portal_Private-Bot.png)
	- Enable all **Privileged Gateway Intents**. ![gateway intents screenshot](assets/screenshots/Discord-Developer-Portal-—-Gateway-Intents.png)
	- Navigate to **0Auth2** and the Subtab **URL Generator**.
	- Tick the boxes for *bot* & *applications.commands* under **SCOPES**. ![scopes screenshot](assets/screenshots/Discord-Developer-Portal_Scopes.png)
	- Under **BOT PERMISSIONS** tick the boxes for
			- *Send Messages*
			- *Embed Links*
			- *Use External Emojis*
			- *Add Reactions*
			- *Connect*
			- *Speak*
		--> ![bot permissions screenshot](assets/screenshots/Discord-Developer-Portal_Bot-Permissions.png)
	- Copy the **GENERATED URL** and open it.
	- Select the server you want to add the Bot to from the dropdown. ![select server screenshot](assets/screenshots/Discord-Authorise-access-to-your-account.png)
	- All we need now is the **Application ID** and the **TOKEN** of your bot. You can find the **APPLICATION ID** under the **General Information** tab. The **TOKEN** can be found under the **Bot** tab. Click the **Reset Token** button and copy your token. Both will be needed in the next step.
2. Clone the repo & set up the bot
	- Clone the repo to where ever you like
	- Run `npm install` to grab all the necessary packages.
	- Create a `.env` file in the repo's root directory.
	- Add your Token to the `.env` file `TOKEN=PASTE_YOUR_BOT_TOKEN_HERE` 
	- In a new line add you application id `CLIENTID=PASTE_YOUR_APPLICATION_ID_HERE`
	- *(optional)* If you know how to create a spotify api application you can also add it's credentials to the `.env` file
	- *(optional)* `SPOTIFYCLIENTID=PASTE_YOUR_SPOTIFY_CIENT_ID_HERE`
	- *(optional)* `SPOTIFYCLIENTSECRET=PASTE_YOUR_SPOTIFY_CLIENT_SECRET_HERE`
3. Start the bot with `node index.js` & enjoy music together!