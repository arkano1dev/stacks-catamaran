import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { userConnected, userDisconnected } from '../../app/slices/User/thunks';
import { getAddresses } from '../../lib/wallet-requests/getAddresses';
import Modal from './Modal';

const ConnectWallet = ({ chain }: { chain: string }) => {
  const dispatch = useAppDispatch();
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
      const result = await getAddresses(chain);
      const stxEntry = result.addresses.find(entry => entry.symbol === 'STX');
      console.log({ stxEntry });
      if (stxEntry) {
        console.log({ result });
        setStxAddress(stxEntry.address);
        dispatch(userConnected({ addresses: result.addresses, stxAddress: stxEntry.address }));
      }
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
