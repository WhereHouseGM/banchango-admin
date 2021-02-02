const KeepingTypes = {
  WARM: 'WARM',
  COLD: 'COLD',
  FREEZE: 'FREEZE',
};

export const keepingTypeToText = (type: string): string => {
  switch (type) {
    case KeepingTypes.WARM:
      return '상온';
    case KeepingTypes.COLD:
      return '냉장';
    case KeepingTypes.FREEZE:
      return '냉동';
    default:
      return '알수없음';
  }
};

const Barcodes = {
  ALL: 'ALL',
  NONE: 'NONE',
  PARTIAL: 'PARTIAL',
};

export const barcodeToText = (type: string): string => {
  switch (type) {
    case Barcodes.ALL:
      return '있음';
    case Barcodes.NONE:
      return '없음';
    case Barcodes.PARTIAL:
      return '일부';
    default:
      return '알수없음';
  }
};
