import { Text, View, Button, Linking, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export function ProfileScreen() {
  function onPressGithub(){
    Linking.openURL('https://github.com/revichrist')
  }

  return (
    <View style={styles.container}>
      <AntDesign name="github" size={36} color="black" />
      <Button title="About Developer" onPress={onPressGithub}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});