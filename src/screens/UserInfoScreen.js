import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import PrimaryButton from '../components/PrimaryButton';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const UserInfoScreen = () => {

  // State variables to hold user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Hook to access the current route and its parameters
  const route = useRoute();
   const { firebaseId } = route.params;// Extract firebaseId from route parameters

  // useEffect to fetch phone number from Firestore when the component mounts
  useEffect(() => {
    const fetchPhoneNumber = async () => {
      try {
         // Fetch the document from Firestore using the provided firebaseId
        const doc = await firestore().collection('phoneNumbers').doc(firebaseId).get();
        if (doc.exists) {
          setPhoneNumber(doc.data().number);// Set the phone number state if document exists
        } else {
          Alert.alert('Error', 'Phone number not found');
        }
      } catch (error) {
        console.error('Error fetching phone number: ', error);
        Alert.alert('Error', 'Failed to fetch phone number');
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneNumber();
  }, [firebaseId]);// Dependency array to ensure the effect runs only once or when firebaseId changes

  const handleSaveUserInfo = async () => {
    if (!name || !email || !gender || !age) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const userData = {
        firebaseId,
        name,
        email,
        gender,
        age,
        phoneNumber,
      };

       // Send a POST request to the server with user data
      const response = await fetch('http://192.168.190.52:3000/api/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert('Success', 'User information saved successfully');
        navigation.navigate('HomeScreen');
      } else {
        const errorText = await response.text();
        Alert.alert('Error', `Failed to save user information: ${errorText}`);
      }
    } catch (error) {
      console.error('Error saving user information: ', error);
      Alert.alert('Error', 'Failed to save user information');
    }
  };

  // Show loading indicator while fetching data
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>More About You</Text>
      <Text style={ styles.name}>Name</Text>
      <TextInput
        style={styles.input_name}
        placeholder="Full name"
        placeholderTextColor="#888888"
        value={name}
        onChangeText={setName}
      />
      <Text style={ styles.email}>Email-Address</Text>
      <TextInput
        style={styles.input_email}
        placeholder="Email-address"
        placeholderTextColor="#888888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Text style={ styles.gender}>Gender</Text>
      {/* <TextInput
        style={styles.input_gender}
        placeholder="Gender"
        placeholderTextColor="#888888"
        value={gender}
        onChangeText={setGender}
      /> */}
      <TextInput>
        
      </TextInput>
      <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.input_gender}
          >
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Other" value="other" />
      </Picker>
      <Text style={ styles.age}>Age</Text>
      <TextInput
        style={styles.input_age}
        placeholder="Age"
        placeholderTextColor="#888888"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <View style={styles.button}> 
      <PrimaryButton title="Proceed"  onPress={handleSaveUserInfo} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    padding: 16,
    backgroundColor: '#1c2129',
  },
  title: {
    position:'absolute',
    fontSize: 24,
    top: 56,
    left:111,
    color:'#EDF6FF',
    
  },
  input_name: {
    position:'absolute',
    color:'#EDF6FF',
    borderColor:'white',
    height: 52,
    width:330,
    left:40,
    top:138,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  input_email:{
    position:'absolute',
    color:'#EDF6FF',
    borderColor:'white',
    height: 52,
    width:330,
    left:40,
    top:235,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  input_gender:{
    position:'absolute',
    color:'#EDF6FF',
    borderColor:'white',
    height: 52,
    width:330,
    left:40,
    top:336,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
    borderColor:'white',
    
  },
  input_age:{
    position:'absolute',
    color:'#EDF6FF',
    borderColor:'white',
    height: 52,
    width:330,
    left:40,
    top:435,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  name:{
    position:'absolute',
    color:'#EDF6FF',
    left:40,
    top:112,
    fontSize:16,
   
  },
  email:{
    position:'absolute',
    color:'#EDF6FF',
    left:40,
    top:209,
    fontSize:16,
  },
  gender:{
    position:'absolute',
    color:'#EDF6FF',
    left:40,
    top:308,
    fontSize:16,
  },
  age:{
    position:'absolute',
    color:'#EDF6FF',
    left:40,
    top:407,
    fontSize:16,
  },
  button: {
    // backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding:15,
    width: 330,
    height: 52,
    alignItems: 'center',
    left:30,
    top:529,
},
 
  

});

export default UserInfoScreen;
