import { h, Component } from 'preact'

export default C =>
    class AppState extends Component {
        state = { selectedImageId: null, selectedAnd: null }

        onSelectImage = selectedImageId =>
            this.setState({ selectedImageId, selectedAdn: null })

        onSelectAdn = (adn, param) =>
            this.setState({ selectedAnd: { adn, param } })

        render() {
            const { selectedImageId } = this.state

            const selectedImage = this.props.images.find(
                x => x.id === selectedImageId
            )

            return (
                <C
                    {...this.props}
                    selectedImage={selectedImage}
                    selectedAdn={this.state.selectedAnd}
                    onSelectAdn={this.onSelectAdn}
                    onSelectImage={this.onSelectImage}
                />
            )
        }
    }
