export const COLORS = {
  primary: '#D4F176',
  primaryDark: '#BBD55E',
  secondary: '#FFB800',
  background: '#FFFFFF',
  text: '#1A1A1A',
  textSecondary: '#666666',
  card: '#F8F9FA',
  border: '#E8E8E8',
  error: '#FF4D4D',
  success: '#4CAF50',
  gradient: {
    primary: ['#D4F176', '#BBD55E'],
    calm: ['#E0F2F1', '#B2DFDB'],
    focus: ['#FFE0B2', '#FFCC80'],
    evening: ['#B39DDB', '#9575CD'],
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export const CARD_STYLES = {
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
};
