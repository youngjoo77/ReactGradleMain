import i18n, { Resource } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { isDevMode } from '@utils/environmentUtils'

import * as ko from '@/locales/ko'
import * as en from '@/locales/en'

// import Backend from 'i18next-http-backend'
// import LanguageDetector from 'i18next-browser-languagedetector'


const userLanguage = localStorage.getItem('language') || window.navigator.language || 'ko';

// axios 통신을 통해 해당 데이터를 생성 후 resources 에 연결 한다.
//const mltLngData = {
//    "en": {
//        'main': {
//            "signIn": "sing In",
//            "logout": "logout",
//            "emailAddr": "email Address",
//            "pwd": "password",
//            "argTest": "arg test {0} {1}",
//            "language": "language",
//            "close":"close",
//            "ok":"ok",
//            "registration":"registration",
//            "modify":"modify",
//            "remove":"remove",
//            "init":"init",
//            "SCRN#SAMPLE": "sample page",
//            "SCRN#SAMPLE_DESC": "sample page description",
//            "SCRN#SAMPLE_ARG": "sample arguments {0} {1}"
//        }
//    },
//    "ko": {
//        'main': {
//            "signIn": "로그인",
//            "logout": "로그아웃",
//            "emailAddr": "이메일주소",
//            "pwd": "비밀번호",
//            "argTest": "변수 테스트 {0} {1}",
//            "language": "언어",
//            "close":"닫기",
//            "ok":"확인",
//            "registration":"등록",
//            "modify":"수정",
//            "remove":"삭제",
//            "init":"초기화",
//            "SCRN#SAMPLE": "샘플 페이지",
//            "SCRN#SAMPLE_DESC": "샘플 페이지 화면 설명 위치",
//            "SCRN#SAMPLE_ARG": "샘플 변수처리 {0} {1}"
//        }
//    }
//}
//
//const resources: Resource = mltLngData;

// 정적 파일을 읽어서 resources 생성
 const resources: Resource = {
     "en": {
         main: en.main
     },
     "ko": {
         main: ko.main
     }
 } as const;

i18n.use(initReactI18next).init({
    resources,
    lng: userLanguage, // 초기 설정 언어
    fallbackLng: "ko-KR", // lng 가 없을때 back up language 설정
    debug: isDevMode,
    defaultNS: "main", // 기본 namespace
    ns: ["main"],
    keySeparator: false,
    interpolation: {
        // 변수 설정
        escapeValue: true,
        prefix: '{',
        suffix: '}'
    },
    react: {
        useSuspense: false
    }
});

export default i18n;