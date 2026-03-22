# Think Before Code

코딩테스트 문제를 **맞히는 앱**이 아니라, 문제를 보고 **어떤 개념을 떠올리고 어떻게 설명할지** 훈련하는 앱.

---

## 실행 방법

### 요구사항

- Node.js 18 이상
- iOS: Xcode + iOS Simulator (Mac 전용)
- Android: Android Studio + AVD
- 또는 실기기에 [Expo Go](https://expo.dev/go) 앱 설치

### 설치

```bash
npm install
```

### 실행

```bash
# 개발 서버 시작 (QR 코드 + 메뉴 출력)
npm start

# iOS 시뮬레이터로 바로 실행
npm run ios

# Android 에뮬레이터로 바로 실행
npm run android

# 웹 브라우저로 실행
npm run web
```

`npm start` 실행 후 터미널에 출력된 QR 코드를 Expo Go 앱으로 스캔하면 실기기에서 바로 확인할 수 있습니다.

---

## Supabase 연동 (선택)

현재는 샘플 데이터로 동작합니다. 실제 DB를 연동하려면:

1. [supabase.com](https://supabase.com)에서 프로젝트 생성

2. `app.json`의 `extra` 필드에 값 입력:

```json
"extra": {
  "supabaseUrl": "https://xxxx.supabase.co",
  "supabaseAnonKey": "your-anon-key"
}
```

3. 마이그레이션 적용:

```bash
npx supabase db push
```

4. 시드 데이터 적용:

```bash
npx supabase db reset
```

---

## 프로젝트 구조

```
app/              # 화면 및 라우팅
src/
  components/     # 재사용 UI 컴포넌트
  stores/         # 상태 관리 (TrainingStore)
  lib/            # Supabase 클라이언트, 상수
  types/          # TypeScript 타입 정의
supabase/
  migrations/     # DB 스키마
  seed.sql        # 샘플 문제 데이터
```
