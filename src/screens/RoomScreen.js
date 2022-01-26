import React from 'react'
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import CreateRoom from '../components/CreateRoom';
import Header from '../components/Header'
import JoinRoom from '../components/JoinScreen';
import { createRoom } from '../redux/action/room.action';
import { addUser } from '../redux/action/user.action';
import { theme } from '../utils/theme'

function RoomScreen({ navigation, route, addUser, createRoom }) {
    
    const { title, id } = route.params;

    const renderBody = (id) => {

        switch (id) {
            case "create":
                return <CreateRoom createRoom={createRoom} addUser={addUser} navigation={navigation} />;
            case "join":
                return(
                    <JoinRoom createRoom={createRoom} addUser={addUser} navigation={navigation} />
                )

        }

    }

    return (
        <SafeAreaView
            style={styles.container}
        >
            <ScrollView 
                style={styles.container}
            >
            <Header title={title} navigation={navigation} />
            <KeyboardAvoidingView>
                {renderBody(id)}
            </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: theme.colors.black
    }
})


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => ({
    addUser: user => dispatch(addUser(user)),
    createRoom: room => dispatch(createRoom(room))
});
export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
