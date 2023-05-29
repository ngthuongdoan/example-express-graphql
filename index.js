const express = require("express")
const fetch = require("node-fetch").default
// const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema")
const cors = require("cors")
const WEBHOOK_DEV =
	"https://chat.googleapis.com/v1/spaces/AAAAUTKGleo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Qg3mPwLKSIh9tFkE-yzWFUywsstLqA7TGKhn3cdsKhc%3D"

const app = express()
app.use(cors())
// app.use(
// 	"/graphql",
// 	graphqlHTTP({
// 		schema,
// 		graphiql: true,
// 	})
// )

app.get("/bot", (req, res, next) => {
	const chatBotHook = WEBHOOK_DEV
	fetch(chatBotHook, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			text: JSON.stringify(req.body || "", null, 2),
		}),
	}).then((response) => {
		return response.json()
	})
	res.end()
})

app.listen(3000, () => {
	console.log("Server is running at port 3000")
})
