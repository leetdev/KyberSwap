import React from "react"
import { connect } from "react-redux"


import {calculateMinAmount, toTWei, toEther} from "../../utils/converter"
//import TokenDest from "./TokenDest"
//import {TokenDest, MinRate} from "../ExchangeForm"
import {Token, ExchangeRate} from "../Exchange"
import {SelectTokenModal, ChangeGasModal, PassphraseModal} from "../CommonElements"

//import {toT, toTWei} from "../../utils/converter"
import {openTokenModal, hideSelectToken} from "../../actions/utilActions"
import { selectToken } from "../../actions/exchangeActions"
import {errorSelectToken, goToStep, showAdvance, changeSourceAmout, openPassphrase} from "../../actions/exchangeActions"


@connect((store) => {
  if (!!!store.account.address){
    window.location.href = "/"
  }
  return {...store.exchange}
})

export default class Exchange extends React.Component {
  openSourceToken = (e) =>{
    this.props.dispatch(openTokenModal("source"))
  }
  openDesToken = (e) =>{
    this.props.dispatch(openTokenModal("des"))

  }
  chooseToken = (symbol,address, type) => {
    
    this.props.dispatch(selectToken(symbol, address, type))
    this.props.dispatch(hideSelectToken())
    // if (this.props.token_source === this.props.token_des){
    //   this.props.dispatch(errorSelectToken("Cannot exchange to the same token"))
    // }else{
    //   this.props.dispatch(errorSelectToken(""))
    // }
  }
  proccessSelectToken = () => {
    if (this.props.sourceTokenSymbol === this.props.desTokenSymbol){
      this.props.dispatch(errorSelectToken("Cannot exchange to the same token"))
    }else{
      this.props.dispatch(goToStep(2))
    }
  }
  showAdvanceOption = () => {
    this.props.dispatch(showAdvance())
  }
  changeSourceAmount = (e) => {
    var value = e.target.value

    console.log(value)
    this.props.dispatch(changeSourceAmout(toTWei(value)))
  }
  clickExchange = () =>{
    if(this.validateExchange){
      this.props.dispatch(openPassphrase())
    }

  }
  validateExchange = () =>{
    return true
  }
  getDesAmount = () => {
    return 0
    // var rate = this.props.rate[0]
    // var sourceAmount = this.props.sourceAmount
    // return calculateMinAmount(sourceAmount, rate).toNumber()
  }
  createRecap = () => {
    return "create reacap"
  }  

  render() {    
    return (
      <div class="k-exchange-page">
       	<div class="page-1" class={this.props.step!==1?'visible-hide':''}>
       		<div>
	       		<Token type="source"
	       				token={this.props.sourceTokenSymbol}
                onSelected={this.openSourceToken}
                 />
                
	       		 <span>to</span>
	       		 <Token type="des"
	       				token={this.props.destTokenSymbol} 
                onSelected={this.openDesToken}
                />
       		</div>
          <div>{this.props.error_select_token}</div>
       		<button onClick = {this.proccessSelectToken}>Continue</button>
       	</div>
        <div class="page-2" class={this.props.step!==2?'visible-hide':''}>
          <div>
            <button onClick={this.showAdvanceOption}>Advance</button>
          </div>
          <h1>Exchange from</h1>
          <div>
            <div>
              <input type="text" value={toEther(this.props.sourceAmount)} onChange={this.changeSourceAmount}/>
              <Token type="source"
                token={this.props.sourceTokenSymbol}
                onSelected={this.openSourceToken}
                 />              
            </div>
             <span> to</span>
            <div>
              <input value={this.getDesAmount()}/>
              <Token type="des"
                token={this.props.destTokenSymbol} 
                onSelected={this.openDesToken}
                />  
            </div>
          </div>
          <div>
            <ExchangeRate rate={this.props.rate}/>
          </div>
          <div>
            <button onClick={this.clickExchange}>Exchange</button>
          </div>

        </div>
        <div class="page-3"  class={this.props.step!==3?'visible-hide':''}>
          step 3
        </div>

        <SelectTokenModal chooseToken ={this.chooseToken} type="exchange"/>
        <ChangeGasModal type="exchange"
                        gas={this.props.gas}
                        gasPrice={this.props.gasPrice} 
                        open = {this.props.advance}
                        gasPriceError = {this.props.errors.gasPriceError}
                        gasError = {this.props.errors.gasError}                        
                        />
        <PassphraseModal   type="exchange"
                          open={this.props.passphrase}
                          recap = {this.createRecap} />
      </div>
    )
  }
}
