import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import { signup, login } from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;

      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };
    default:
      return state;
  }
};

const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error ocurred", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (isSignUp) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              minLength={5}
              required
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primaryColor} />
              ) : (
                <Button
                  title={isSignUp ? "SignUp" : "Login"}
                  color={Colors.primaryColor}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? "Login" : "Sign Up"}`}
                color={Colors.accentColor}
                onPress={() => {
                  setIsSignUp((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
