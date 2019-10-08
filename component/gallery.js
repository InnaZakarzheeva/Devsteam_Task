import React from 'react';
import {
    Image,
    StyleSheet,
    Button,
    View,
    TouchableWithoutFeedback,
    ScrollView,
    Modal,
    Text
} from 'react-native';

export default class ImageGallery extends React.Component{
    state = {
        modalVisible: false,
        modalImage: null,
        img: []
    }

    componentDidMount = () => {
        const self = this;
        fetch('https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9').then(
            function(response){
                return response.json();
            }
            ).then(function(jsonData){
                let urlsData = [];
                jsonData.map(item => {
                    urlsData.push({
                        urls: item.urls.raw,
                        name: item.user.name
                    })
                })
                    self.setState({img: urlsData});
                    console.log(urlsData);
            });
    }

    setModalVisible = (visible, imgKey) => {
        this.setState({
            modalImage: this.state.img[imgKey].urls
        })
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.containerImage}>
                    <Modal style={styles.modal} 
                        animationType={'fade'}
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {}}>
                        <View style={styles.modal}>
                            <Button style={styles.text} 
                                onPress={() => {this.setModalVisible(false, 0)}} 
                                title='Close'>    
                            </Button>
                            <Image source={{uri:this.state.modalImage}} style={styles.imagesFull}></Image>
                        </View>
                    </Modal>
                    {this.state.img.map((item, key) => {
                        return <TouchableWithoutFeedback key={key} onPress={() => {this.setModalVisible(true, key)}}>
                                    <View style={styles.imagewrap}>
                                        <Image source={{uri: item.urls}} style={styles.images}></Image>
                                        <Text style={styles.textName}>{item.name}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                    })}
                </ScrollView>    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerImage: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    imagewrap: {
        margin: 2,
        padding: 2,
        height: 200,
        width: 150,
        backgroundColor: '#fff'
    },
    modal: {
        flex: 1,
        padding: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
    },
    text: {
        color: '#fff'
    },
    images: {
        flex: 1,
        width: 150,
        height: 150
    },
    imagesFull: {
        flex: 1,
        width: null,
        alignSelf: 'stretch'
    },
    textName: {
        fontSize: 14,
        fontWeight: "700",
        color: '#000'
    }
})