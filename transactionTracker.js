import React, { useState } from 'react';
import { View, Button, TextInput, Alert } from 'react-native';
import analytics from '@react-native-firebase/analytics';

const TransactionTracker = () => {
  const [transactionId, setTransactionId] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');
  const [currency, setCurrency] = useState('');

  const trackTransaction = () => {
    if (!transactionId || !itemName || !itemAmount || !currency) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    analytics().logEvent('purchase', {
      id: transactionId,
      itemName: itemName,
      quantity: 1,
      price: parseFloat(itemAmount),
      currency: currency,
    });

  
    analytics().setUserProperty('total_purchases', '1');

    
    setTransactionId('');
    setItemName('');
    setItemAmount('');
    setCurrency('');
  };

  return (
    <View>
      <TextInput
        placeholder="Transaction ID"
        value={transactionId}
        onChangeText={(text) => setTransactionId(text)}
      />
      <TextInput
        placeholder="Item Name"
        value={itemName}
        onChangeText={(text) => setItemName(text)}
      />
      <TextInput
        placeholder="Item Amount"
        value={itemAmount}
        onChangeText={(text) => setItemAmount(text)}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Currency"
        value={currency}
        onChangeText={(text) => setCurrency(text)}
      />
      <Button title="Track Transaction" onPress={trackTransaction} />
    </View>
  );
};

export default TransactionTracker;
