import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { NotoSerif_400Regular, NotoSerif_400Regular_Italic, NotoSerif_700Bold, NotoSerif_700Bold_Italic, useFonts } from '@expo-google-fonts/noto-serif';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../../components/ScreenWrapper';
import { auth } from '../../config/firebaseConfig';
import { logOut } from '../../services/authService';
import { getUserProfile, updateUserProfile } from '../../services/userService';
import { COLORS } from '../../theme/colors';


const ProfileEditorScreen = () => {
    const [fontsLoaded] = useFonts({
        NotoSerif_400Regular,
        NotoSerif_700Bold,
        NotoSerif_400Regular_Italic,
        NotoSerif_700Bold_Italic,
        Inter_400Regular,
        Inter_500Medium,
        Inter_600SemiBold,
    });

    const formatDate = (timestamp?: number) => {
        if (!timestamp) return "Never";

        const date = new Date(timestamp);

        const day = date.getDate().toString().padStart(2, "0");
        const month = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
    });

    const [profileData, setProfileData] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = auth.currentUser;
                if (!user) return;

                const profile = await getUserProfile(user.uid);

                setProfileData(profile);

                setForm({
                    fullName: profile?.fullName || '',
                    email: profile?.email || user.email || '',
                    phone: profile?.phone || '',
                    location: profile?.location || '',
                });
            } catch (error) {
                console.error("Failed to load user:", error);
            }
        };

        loadUser();
    }, []);

    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    if (!fontsLoaded) {
        return null; // Or a loading spinner
    }

    const renderInput = (key: keyof typeof form, label: string) => {
        const isFocused = focusedField === key;
        return (
            <View style={styles.inputContainer} key={key}>
                <Text style={styles.inputLabel}>{label}</Text>
                <TextInput
                    style={[
                        styles.textInput,
                        { borderBottomColor: isFocused ? '#c99f7a' : (isEditing ? 'rgba(201, 159, 122, 0.3)' : 'transparent') }
                    ]}
                    value={form[key]}
                    onChangeText={(text) => setForm({ ...form, [key]: text })}
                    onFocus={() => setFocusedField(key)}
                    onBlur={() => setFocusedField(null)}
                    selectionColor="#c99f7a"
                    editable={isEditing}
                />
            </View>
        );
    };

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    {/* Avatar Section */}
                    <View style={styles.avatarSection}>
                        <View style={styles.avatarWrapper}>
                            <LinearGradient
                                colors={['#c99f7a', '#ebbe97']}
                                style={styles.avatarRing}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                            >
                                <Image
                                    source={require('../../assets/images/cat.jpg')}
                                    style={styles.avatarImage}
                                    contentFit="cover"
                                    transition={500}
                                />
                            </LinearGradient>
                            {isEditing && (
                                <TouchableOpacity style={styles.editAvatarButton} activeOpacity={0.8}>
                                    <FontAwesome5 name="pencil-alt" size={14} color="#18120f" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <Text style={styles.userName}>
                            {form.fullName || 'No Name'}
                        </Text>
                        <Text style={styles.userTitle}>Senior Curator & Research Fellow</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.formCard}>
                        {renderInput('fullName', 'Full Name')}
                        {renderInput('email', 'Email Address')}
                        {renderInput('phone', 'Phone Number')}
                        {renderInput('location', 'Location')}
                    </View>

                    {/* Action Button */}
                    {isEditing ? (
                        <TouchableOpacity
                            style={styles.saveButton}
                            activeOpacity={0.8}
                            onPress={async () => {
                                try {
                                    const user = auth.currentUser;
                                    if (!user) return;

                                    await updateUserProfile(user.uid, {
                                        fullName: form.fullName,
                                        phone: form.phone,
                                        location: form.location,
                                    });

                                    const updatedProfile = await getUserProfile(user.uid);
                                    setProfileData(updatedProfile);

                                    setIsEditing(false);
                                } catch (error) {
                                    console.error("Failed to update profile:", error);
                                }
                            }}
                        >
                            <Ionicons name="save" size={24} color="#533619" style={styles.saveIcon} />
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={styles.saveButton}
                            activeOpacity={0.8}
                            onPress={() => setIsEditing(true)}
                        >
                            <FontAwesome5 name="user-edit" size={20} color="#533619" style={styles.saveIcon} />
                            <Text style={styles.saveButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    )}

                    {/* Log Out Button */}
                    <TouchableOpacity
                        style={styles.logoutButton}
                        activeOpacity={0.6}
                        onPress={async () => {
                            try {
                                await logOut();
                            } catch (error) {
                                console.error('Logout failed:', error);
                            }
                        }}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#e57373" style={styles.logoutIcon} />
                        <Text style={styles.logoutButtonText}>Sign Out</Text>
                    </TouchableOpacity>

                    {/* Footer Note */}
                    <Text style={styles.footerNote}>
                        Last updated: {formatDate(profileData?.lastUpdated)}
                    </Text>

                </View>
            </ScrollView>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 24,
    },
    container: {
        flex: 1,
        width: '100%',
        maxWidth: 448,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    // --- Avatar Section ---
    avatarSection: {
        alignItems: 'center',
        marginBottom: 48, // Breathing negative space
    },
    avatarWrapper: {
        width: 160,
        height: 160,
        marginBottom: 16,
        position: 'relative',
    },
    avatarRing: {
        width: 160,
        height: 160,
        borderRadius: 80,
        padding: 4, // Thickness of the gradient ring
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 152,
        height: 152,
        borderRadius: 76,
        backgroundColor: COLORS.background, // Fallback color
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 4, // Inside the gradient ring roughly
        right: 4,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.accent,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'rgba(24,18,15, 0.4)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 5,
    },
    userName: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 24,
        color: '#ede0d9',
        marginBottom: 4,
    },
    userTitle: {
        fontFamily: 'NotoSerif_400Regular_Italic',
        fontSize: 14,
        color: 'rgba(235, 190, 151, 0.7)', // #ebbe97 at 70% opacity
    },
    // --- Form Card ---
    formCard: {
        width: '100%',
        backgroundColor: COLORS.background,
        borderRadius: 24,
        padding: 32,
        gap: 32,
        marginBottom: 48, // Breathing negative space
        shadowColor: 'rgba(24,18,15, 0.2)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 1,
        shadowRadius: 24,
        elevation: 10,
    },
    inputContainer: {
        width: '100%',
    },
    inputLabel: {
        fontFamily: 'NotoSerif_700Bold', // Using Noto Serif bold
        fontSize: 12,
        color: 'rgba(95, 64, 34, 0.7)', // #5f4022 at 70% opacity
        textTransform: 'uppercase',
        letterSpacing: 2, // tracking-widest
        marginBottom: 8, // Space between label and input
    },
    textInput: {
        fontFamily: 'Inter_400Regular',
        fontSize: 16,
        color: '#2d1600',
        paddingVertical: 8,
        borderBottomWidth: 2, // Zero 1px borders
    },
    // --- Save Button ---
    saveButton: {
        width: '100%',
        height: 64,
        backgroundColor: COLORS.accent,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: 'rgba(24,18,15, 0.3)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 8,
    },
    saveIcon: {
        marginRight: 12,
    },
    saveButtonText: {
        fontFamily: 'NotoSerif_700Bold',
        fontSize: 20,
        color: '#533619',
    },
    // --- Log Out Button ---
    logoutButton: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 48, // Breathing negative space
    },
    logoutIcon: {
        marginRight: 8,
    },
    logoutButtonText: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: '#e57373',
        letterSpacing: 0.5,
    },
    // --- Footer Note ---
    footerNote: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: 'rgba(237, 224, 217, 0.5)', // #ede0d9 at 50% opacity
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 24, // extra bottom padding for scroll
    },
});

export default ProfileEditorScreen;