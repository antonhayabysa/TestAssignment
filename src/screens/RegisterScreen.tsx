import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';
import {launchImageLibrary} from 'react-native-image-picker';
import {StackNavigationProp} from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
import {RootStackParamList} from '../types';
import styles from '../styles/RegisterScreenStyles';

const registeredEmails: string[] = ['mail.anton88@gmail.com'];

type Position = {
  id: number;
  name: string;
};

type RegisterScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Register'>;
};

type Option = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  options: Option[];
  onSelect: (value: string) => void;
  selectedOption: string;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  onSelect,
  selectedOption,
}) => {
  return (
    <View style={styles.radioContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButtonContainer}
          onPress={() => onSelect(option.value)}>
          <View style={styles.radioButton}>
            {selectedOption === option.value && (
              <View style={styles.radioButtonSelected} />
            )}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function RegisterScreen({navigation}: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positionId, setPositionId] = useState<string>('frontend');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [positions, setPositions] = useState<Position[]>([]);
  const [photo, setPhoto] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [photoData, setPhotoData] = useState<any>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setName('');
      setEmail('');
      setPhone('');
      setPositionId('frontend');
      setPhoto(null);
      setPhotoData(null);
      setErrors({});
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get<{positions: Position[]}>(
          'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
        );
        setPositions(response.data.positions);
      } catch (err: any) {
        console.error('Error fetching positions:', err.message || err);
      }
    };

    fetchPositions();
  }, []);

  const handlePhotoUpload = () => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 70, maxHeight: 70},
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedPhoto = response.assets[0];
          if (selectedPhoto.uri) {
            setPhoto(selectedPhoto.uri);
            setPhotoData({
              uri: selectedPhoto.uri,
              type: selectedPhoto.type || 'image/jpeg',
              name: selectedPhoto.fileName || 'photo.jpg',
            });
          } else {
            console.error('Selected photo URI is undefined');
          }
        }
      },
    );
  };

  const handleSubmit = async () => {
    if (registeredEmails.includes(email)) {
      navigation.navigate('SignUpFailedScreen');
      return;
    }

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Required field').min(2).max(60),
      email: Yup.string()
        .matches(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Invalid email format')
        .required('Required field'),
      phone: Yup.string()
        .matches(
          /^\+380\d{9}$/,
          'Phone number must start with +380 and contain 12 digits',
        )
        .required('Required field'),
      positionId: Yup.string().required('Position is required'),
      photo: Yup.mixed().required('Photo is required'),
    });

    try {
      await validationSchema.validate(
        {name, email, phone, positionId, photo},
        {abortEarly: false},
      );
      setErrors({});

      registeredEmails.push(email);

      navigation.navigate('SignUpSuccessScreen');
    } catch (err: any) {
      if (err instanceof Yup.ValidationError) {
        const formErrors: {[key: string]: string} = {};
        err.inner.forEach((error: any) => {
          if (error.path) {
            formErrors[error.path] = error.message;
          }
        });
        setErrors(formErrors);
      } else {
        console.error('Error during registration:', err.message || err);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setErrors(prevErrors => ({...prevErrors, [field]: ''}));
    if (field === 'name') {
      setName(value);
    }
    if (field === 'email') {
      setEmail(value);
    }
    if (field === 'phone') {
      setPhone(value);
    }
    if (field === 'photo') {
      setPhoto(value);
    }
  };

  const options: Option[] = [
    {label: 'Frontend developer', value: 'frontend'},
    {label: 'Backend developer', value: 'backend'},
    {label: 'Designer', value: 'designer'},
    {label: 'QA', value: 'qa'},
  ];

  return (
    <View style={styles.container}>
      <View
        style={[styles.inputContainer, errors.name ? styles.inputError : {}]}>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          value={name}
          onChangeText={value => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View
        style={[styles.inputContainer, errors.name ? styles.inputError : {}]}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={value => handleInputChange('email', value)}
        />
      </View>
      <View style={styles.errorContainer}>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View
        style={[styles.inputContainer, errors.name ? styles.inputError : {}]}>
        <TextInput
          style={styles.textInput}
          placeholder="Phone"
          value={phone}
          onChangeText={value => handleInputChange('phone', value)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.errorContainer}>
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : (
          <Text style={styles.hintText}>+38 (XXX) XXX - XX - XX</Text>
        )}
      </View>

      <Text style={styles.title}>Select your position</Text>
      <RadioButton
        options={options}
        onSelect={setPositionId}
        selectedOption={positionId}
      />

      <View
        style={[styles.inputContainer, errors.name ? styles.inputError : {}]}>
        <Text style={styles.photoUploadText}>Upload your photo</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handlePhotoUpload}>
          <Text style={styles.uploadButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.errorContainer}>
        {errors.photo && <Text style={styles.errorText}>{errors.photo}</Text>}
      </View>

      <TouchableOpacity
        style={[
          styles.signUpButton,
          Object.keys(errors).length > 0 && styles.signUpButtonError,
        ]}
        onPress={handleSubmit}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}
