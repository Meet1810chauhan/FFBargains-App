import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

// Base width from which scaling is calculated (adjust based on your design)
const guidelineBaseWidth = 375;

const scaleFont = (size: number) => (width / guidelineBaseWidth) * size;

export default scaleFont;
