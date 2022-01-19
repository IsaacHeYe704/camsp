import { Alert, Button, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react';


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      isBiometricSupported ? handleBiometricAuth():null
    })();
  });
  const handleBiometricAuth = async () => {
    LocalAuthentication.getEnrolledLevelAsync().then((r)=>{alert("nivel " + r)})
    LocalAuthentication.supportedAuthenticationTypesAsync().then((r)=>{alert(" tipo " + r)})
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (!savedBiometrics)
        alert('not info')
      else
        alert('reconocible')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}> este celular {isBiometricSupported ?  "es" : "no es"} compatible con biometria</Text>

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title="abrir" onPress={()=> LocalAuthentication.authenticateAsync().then((r)=>{alert(r.success)})} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
