import { request, showConnect } from '@stacks/connect';
import { AddressEntry } from '@stacks/connect/dist/types/methods';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userConnected, userDisconnected } from '../../app/slices/User/thunks';
import { AppDispatch } from '../../app/store';
import Modal from './Modal';
import { useAppSelector } from '../../app/hooks';
import { userSession } from '../../lib/userSession';

const ConnectWallet = ({ chain }: { chain: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector(state => state.user);
  const [showModal, setShowModal] = React.useState(false);
  const [stxAddress, setStxAddress] = React.useState<string | undefined>(user.wallet?.stxAddress);
  const isAuthenticated = stxAddress !== undefined;

  const logout = () => {
    setStxAddress(undefined);
    setShowModal(false);
    dispatch(userDisconnected());
  };

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflowY = 'auto';
  };

  const authenticate = async () => {
    if (isAuthenticated) {
      openModal();
    } else {
      const result = await request("getAddresses", {
        network: chain === "testnet" ? "testnet" : "mainnet",
      })
      console.log({ result })
      const stxEntry = result.addresses.find((entry) => entry.symbol === "STX");
      console.log({ stxEntry })
      if (stxEntry) {
        console.log({ result });
        setStxAddress(stxEntry.address);
        dispatch(userConnected({ addresses: result.addresses, stxAddress: stxEntry.address }));
      }

      showConnect({
        appDetails: {
          name: 'Stacks React Starter',
          icon: window.location.origin + '/logo512.png',
        },
        redirectTo: '/',
        onFinish: () => {
          window.location.reload();
        },
        userSession: userSession,
      })
    }
  };

  console.log({ stxAddress }, isAuthenticated);

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="bg-[rgba(255,255,255,0.1)] px-6 py-3 rounded-full text-base font-light leading-6 border-special-black border-[1px] dark:border-none"
        type="button"
        onClick={authenticate}
      >
        {stxAddress ? `${stxAddress.slice(0, 5)}...${stxAddress.slice(-3)}` : 'Connect Wallet'}
      </button>
      <Modal showModal={showModal} handleConfirm={logout} handleClose={closeModal}>
        <p className="mx-auto">Do you want to logout?</p>
      </Modal>
    </>
  );
};

export default ConnectWallet;
