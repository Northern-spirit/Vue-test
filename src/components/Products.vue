<template>
	<div>
		<h1 class="title">All Products</h1>
    	<p>{{length}} products</p>
    	<table class="table is-striped">
		    <thead>
		      <tr>
		        <th>Name</th>
		        <th>Description</th>
				<th>IMAGE</th>
		        <th>Price</th>
				<th>Count</th>
				<th></th>
				<th></th>
		        <th></th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr v-for="product in products" track-by="id" >
		        <td v-if="cart.some(pC=>pC.name === product.name)" style="background-color: green">{{product.name}}</td>
		        <td v-if="!cart.some(pC=>pC.name === product.name)" style="background-color: white">{{product.name}}</td>
		        <td>{{product.description}}</td>
				<td><img :src='product.img' width="200" height="200" alt="pruduct img" /></td>
		        <td>${{product.price}}</td>
		        <td>{{cart.find(cP=>cP.name===product.name) ? cart.find(cP=>cP.name===product.name).quantity : "0"}}</td>
		        <td><button @click='addToCart(product)' class='button is-info'>Add to cart</button></td>
		        <td><button @click='removeFromCart(product)' class='button is-danger'>Remove from cart</button></td>
		      </tr>
		    </tbody>
		</table>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    products: 'allProducts',
    length: 'getNumberOfProducts',
	cart: 'cartProducts'
  }),
  methods: mapActions([
    'addToCart',
	'removeFromCart'
  ])
}
</script>

<style lang="scss">

</style>
