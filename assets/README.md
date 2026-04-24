# 🥝 KiwiNest

다마고치형 공부 기록 사이트입니다.  
Supabase는 연결하지 않은 localStorage 기반 최종본입니다.

## 실행 방법

1. 압축을 풉니다.
2. `KiwiNest/index.html`을 브라우저에서 엽니다.
3. 동물, 이름, 테마, 성격을 선택합니다.
4. 공부를 기록하면 동물이 성장합니다.

## 포함 기능

### 공부 동기 강화
- 오늘 목표 설정
- 공부 3회/5회/10회 퀘스트
- 연속 공부일 스트릭
- 과목별 업적
- 오늘의 랜덤 미션

### 다마고치 감성 강화
- 기분/배고픔/졸림 상태
- 공부 안 한 날의 아쉬운 대사
- 키위새 레벨별 이미지 변화
- 방 꾸미기
- 딸기우유/초코우유/젤리/과자

### 동생/키위 세계관 강화
- 실제 간식 줬어요 기록
- 같이 공부했어요 버튼
- 머리에 손 올리기 기록
- 키위 일기
- 키위가 누나에게 쓰는 편지

### 기술적 강화
- 이미지 파일 적용
- 데이터 백업/복원
- 모바일 화면 최적화
- GitHub Pages 배포 가능 구조
- Supabase 연결용 placeholder 파일

## 파일 구조

```text
KiwiNest/
├─ index.html
├─ css/
│  ├─ style.css
│  ├─ themes.css
│  └─ mobile.css
├─ js/
│  ├─ app.js
│  ├─ data.js
│  ├─ state.js
│  ├─ storage.js
│  ├─ logic.js
│  ├─ ui.js
│  ├─ events.js
│  ├─ quests.js
│  ├─ achievements.js
│  ├─ petStatus.js
│  ├─ diary.js
│  ├─ room.js
│  ├─ importExport.js
│  └─ supabaseClient.js
└─ assets/
   ├─ animals/
   │  ├─ kiwi-lv1.png
   │  ├─ kiwi-lv2.png
   │  └─ kiwi-lv3.png
   ├─ room/
   └─ snacks/
```
