const WarehouseStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  VIEWABLE: 'VIEWABLE',
  REJECTED: 'REJECTED',
  DELETED: 'DELETED',
};

export const statusToColor = (status: string) => {
  switch (status) {
    case WarehouseStatus.IN_PROGRESS:
      return 'black';
    case WarehouseStatus.VIEWABLE:
      return '#1e56a0';
    case WarehouseStatus.REJECTED:
      return '#15c7ab';
    case WarehouseStatus.DELETED:
      return '#ff0000';
    default:
      return '#d5d5d5';
  }
};

export const statusToText = (status: string) => {
  switch (status) {
    case WarehouseStatus.IN_PROGRESS:
      return '접수';
    case WarehouseStatus.VIEWABLE:
      return '승인';
    case WarehouseStatus.REJECTED:
      return '반려';
    case WarehouseStatus.DELETED:
      return '삭제';
    default:
      return '알수없음';
  }
};
