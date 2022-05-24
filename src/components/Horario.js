import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Switch } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
//brooooo por qué los datepickers no me funcionan???????????????????? aaaaaa

const Horario = () => {
  return (
    <View>
      <Text>DATE PICKEEEER QUE FUNCIONEEEEEEE</Text>
      <View>
        <View>
          <Text>Lunes</Text>
          <Switch />
        </View>
        <View>
          <Text>Martes</Text>
          <Switch />
        </View>
        <View>
          <Text>Miércoles</Text>
          <Switch />
        </View>
        <View>
          <Text>Jueves</Text>
          <Switch />
        </View>
        <View>
          <Text>Viernes</Text>
          <Switch />
        </View>
        <View>
          <Text>Sábado</Text>
          <Switch />
        </View>
        <View>
          <Text>Domingo</Text>
          <Switch />
        </View>
      </View>
    </View>
  );
};

export default Horario;

const styles = StyleSheet.create({});
