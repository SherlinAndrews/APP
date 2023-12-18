import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import database from '@react-native-firebase/database';

const AddressMonitor = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [addressData, setAddressData] = useState(null);

  const monitorAddress = () => {
    if (walletAddress.trim() !== '') {
      const addressRef = database().ref(`wallets/${walletAddress}`);

      const onDataChange = (snapshot) => {
        const data = snapshot.val();
        setAddressData(data);
      };

      addressRef.on('value', onDataChange);
    }
  };

  return (
    <View>
      <Text>Enter Wallet Address:</Text>
      <TextInput
        value={walletAddress}
        onChangeText={(text) => setWalletAddress(text)}
        placeholder="Enter wallet address"
        style={{ borderWidth: 1, borderColor: 'gray', padding: 8, marginBottom: 10 }}
      />
      <Button title="Monitor Address" onPress={monitorAddress} />
      <View>
        {addressData && (
          <View>
            <Text>Monitoring Address: {walletAddress}</Text>
            <Text>
              Current Balance: {addressData.balance} {addressData.currency}
            </Text>
            {/* Add more components to display other address data */}
          </View>
        )}
      </View>
    </View>
  );
};

export default AddressMonitor;
