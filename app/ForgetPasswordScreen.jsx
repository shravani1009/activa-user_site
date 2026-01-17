import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);

  // Responsive scaling
  const scaleWidth = SCREEN_WIDTH / 414;
  const scaleHeight = SCREEN_HEIGHT / 896;

  const isEmailValid = email.trim().length > 0;

  const handleSendLink = () => {
    if (!isEmailValid) return;
    setLinkSent(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#3E0288" }}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/LoginScreen")}
        style={{
          position: "absolute",
          top: 70 * scaleHeight,
          left: 26 * scaleWidth,
          width: 22 * scaleWidth,
          height: 22 * scaleHeight,
          zIndex: 10,
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="arrow-back" size={22 * scaleWidth} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={{
          position: "absolute",
          top: 117 * scaleHeight,
          left: 27 * scaleWidth,
          fontSize: 24 * scaleWidth,
          color: "#FFFFFF",
          fontWeight: "600",
        }}
      >
        Forgot Password
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          position: "absolute",
          top: 159 * scaleHeight,
          left: 27 * scaleWidth,
          right: 27 * scaleWidth,
          fontSize: 12 * scaleWidth,
          color: "#E8E8E8",
        }}
      >
        Enter your email address and we'll send you instructions to reset your
        password.
      </Text>

      {/* Email Label */}
      <Text
        style={{
          position: "absolute",
          top: 220 * scaleHeight,
          left: 27 * scaleWidth,
          fontSize: 12 * scaleWidth,
          color: "#DADADA",
        }}
      >
        Email Address
      </Text>

      {/* Email Input */}
      <View
        style={{
          position: "absolute",
          top: 240 * scaleHeight,
          left: 25 * scaleWidth,
          right: 25 * scaleWidth,
          height: 56 * scaleHeight,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#D8B4FE",
          borderRadius: 12 * scaleWidth,
          paddingHorizontal: 16 * scaleWidth,
        }}
      >
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#C4B5FD"
          style={{ flex: 1, color: "white", fontSize: 16 * scaleWidth }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Ionicons name="mail-outline" size={20 * scaleWidth} color="#E9D5FF" />
      </View>

      {/* Bottom Section */}
      <View
        style={{
          position: "absolute",
          top: 400 * scaleHeight,
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        {/* SUCCESS STATE */}
        {linkSent ? (
          <View
            style={{
              width: "85%",
              maxWidth: 320 * scaleWidth,
              backgroundColor: "#FFFFFF",
              borderRadius: 16 * scaleWidth,
              paddingVertical: 24 * scaleHeight,
              paddingHorizontal: 20 * scaleWidth,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 20 * scaleHeight,
           
            }}
          >
            <Ionicons name="checkmark-circle" size={18 * scaleWidth}
  color="#34C759"
  style={{ marginRight: 8 * scaleWidth }} />
            <Text
              style={{
                fontSize: 14 * scaleWidth,
                fontWeight: "500",
                color: "#34C759",
              }}
            >
              Check your email for reset password
            </Text>
       
          </View>
        ) : (
          <>
            {/* Send Reset Link Button */}
            <TouchableOpacity
              style={{
                width: "80%",
                maxWidth: 287 * scaleWidth,
                height: 45 * scaleHeight,
                backgroundColor: "white",
                borderRadius: 12 * scaleWidth,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15 * scaleHeight,
                opacity: isEmailValid ? 1 : 0.5,
              }}
              activeOpacity={0.8}
              onPress={handleSendLink}
              disabled={!isEmailValid}
            >
              <Text
                style={{
                  color: "#6B21A8",
                  fontWeight: "600",
                  fontSize: 16 * scaleWidth,
                }}
              >
                Send Reset Link
              </Text>
            </TouchableOpacity>

            {/* Remember Password */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 40 * scaleHeight,
              }}
            >
              <Text
                style={{
                  fontSize: 12 * scaleWidth,
                  color: "#E8E8E8",
                  marginRight: 4 * scaleWidth,
                }}
              >
                Remember your password?
              </Text>

              <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
                <Text
                  style={{
                    fontSize: 12 * scaleWidth,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>

            {/* Security Info */}
            <View style={{ alignItems: "center" }}>
              <Ionicons
                name="lock-closed-outline"
                size={22 * scaleWidth}
                color="#FFFFFF"
              />
              <Text
                style={{
                  fontSize: 12 * scaleWidth,
                  color: "#DADADA",
                  marginTop: 10 * scaleHeight,
                }}
              >
                Your account is secure with us
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
}
