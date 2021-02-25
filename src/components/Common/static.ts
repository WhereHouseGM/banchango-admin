import { message } from 'antd';

export const WRONG_TOKEN = 'WRONG_TOKEN';

export const handleApiError = (
  status: number,
  errorMessageFor404: string,
): void => {
  if (status === 401) {
    message.error('[401] : 토큰 값이 잘못되었습니다. 다시 로그인 해주세요.');
  } else if (status === 403) {
    message.error(
      '[403] : 로그인한 사용자가 관리자가 아닙니다. 다시 로그인 해주세요.',
    );
  } else if (status === 404) {
    message.error(`[404] : ${errorMessageFor404}`);
  } else {
    message.error(
      `[${status}] : 알 수 없는 오류가 발생했습니다. 관리자에게 문의해 주세요.`,
    );
  }
};
