const graphql = require("graphql")
const axios = require("axios")
const {
	GraphQLString,
	GraphQLInt,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLList,
} = graphql

const MenuItem = new GraphQLObjectType({
	name: "MenuItemType",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		price: { type: GraphQLString },
	}),
})

const Restaurant = new GraphQLObjectType({
	name: "RestaurantType",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		location: { type: GraphQLString },
		menu: { type: new GraphQLList(MenuItem) },
	}),
})

const Customer = new GraphQLObjectType({
	name: "UserType",
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		location: { type: GraphQLString },
	}),
})

const Order = new GraphQLObjectType({
	name: "OrderType",
	fields: () => ({
		id: { type: GraphQLString },
		customerId: { type: GraphQLString },
		restaurantId: { type: GraphQLString },
		order: { type: new GraphQLList(GraphQLString) },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		restaurants: {
			type: new GraphQLList(Restaurant),
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:4200/restaurants`)
					.then((res) => res.data)
			},
		},
		restaurant: {
			type: Restaurant,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:4200/restaurants/${args.id}`)
					.then((res) => res.data)
			},
		},
		customers: {
			type: new GraphQLList(Customer),
			resolve(parentValue, args) {
				return axios
					.get(`http://localhost:4200/customers`)
					.then((res) => res.data)
			},
		},
		customer: {
			type: Customer,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parentValue, args) {
				return axios
					.get(`https://my-json-server.typicode.com/customers/${args.id}`)
					.then((res) => res.data)
			},
		},
		orders: {
			type: new GraphQLList(Order),
			resolve(parentValue, args) {
				return axios.get(`http://localhost:4200/orders`).then((res) => res.data)
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
