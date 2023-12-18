import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen } from './Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Field from './Field';

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSignUp = async () => {
    const { email, password } = formData;

    if (email !== formData.confirmEmail) {
      console.error('Emails do not match');
