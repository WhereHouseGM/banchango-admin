const EstimateStatus = {
  IN_PROGRESS: 'IN_PROGRESS',
  RECEPTED: 'RECEPTED',
  DONE: 'DONE',
};

export const statusToColor = (status: string) => {
  switch (status) {
    case EstimateStatus.IN_PROGRESS:
      return 'black';
    case EstimateStatus.RECEPTED:
      return '#d5d5d5';
    case EstimateStatus.DONE:
      return '#1e56a0';
    default:
      return '#d5d5d5';
  }
};

export const statusToText = (status: string) => {
  switch (status) {
    case EstimateStatus.IN_PROGRESS:
      return '진행중';
    case EstimateStatus.RECEPTED:
      return '접수';
    case EstimateStatus.DONE:
      return '완료';
    default:
      return '알수없음';
  }
};
