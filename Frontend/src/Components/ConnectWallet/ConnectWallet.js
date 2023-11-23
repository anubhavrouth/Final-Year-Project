import React from 'react'
import Button from '../../common/Button/Button';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const ConnectWallet = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  window.ethereum.on("chainCchanged", () => {
    window.location.reload();
  })

  window.ethereum.on("accountsChanged", () => {
    window.location.reload();
  })

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
      console.log("haveMetamask:", haveMetamask,", accountAddress:", accountAddress, ", accountBalance:", accountBalance, ", isConnected:", isConnected);
    } catch (error) {
      setIsConnected(false);
    }
  };
  return (
    <div>
        <Button btnType='SECONDARY' btnOnClick={connectWallet} btnText={`${accountAddress !== '' ? 'Connected' : 'Connect Metamask'}`} className='mm-btn' />
      </div>
  )
}

export default ConnectWallet