<?php
/**
 * Example: Simple Purchase
 * 
 * This example shows the simplest method of accepting a payment with PayPal.
 */

require_once 'ppeg/functions.php';

//Get the hash code and the cart
session_name('APN');
session_start();

$hashcode =$_SESSION['hashcode'];
$cart=$_SESSION['cart'];

session_write_close();

$paypal = initPurchaseDetails(json_decode($cart, true));
//$paypal = create_example_purchase();

?>
	<div class="container" id="ppcontainer">
		<img src="https://www.paypal.com/en_US/i/btn/btn_dg_pay_w_paypal.gif"/>
		<p>Art-Please use paypal as payment provider. If you don't have a paypal account just buy as a guest by clicking on the link at the bottom of the next paypal payment window</p>
		<p><b>Description:</b> <?php echo $paypal->get_description(); ?></p>
		<p><b>Purchase price:</b> <?php echo $paypal->get_purchase_price(); ?></p>
		<?php $paypal->print_buy_button(); ?>
	</div>

