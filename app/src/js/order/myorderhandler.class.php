<?php
class myOrderHandler extends msOrderHandler
{
    public function submit($data = array())
    {
        $min_price_order = $this->modx->getOption('ms2_minimum_price_order');
        $cart_status = $this->ms2->cart->status();
        $currency = $this->modx->lexicon('ms2_frontend_currency');
        if( $cart_status['total_cost'] < $min_price_order )
        {
            return $this->error( 'ms2_order_err_total_price', array(), array('price'=>$min_price_order, 'currency'=>$currency) );
        }
        return parent::submit($data);
    }
}