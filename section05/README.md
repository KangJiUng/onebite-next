## 섹션 5: 페이지 캐싱

- 풀 라우트 캐시(Full Route Cache)
    - Next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능
    - Static한 페이지들에만 적용됨
    - 리퀘스트 메모이제이션이나 데이터 캐시 등의 캐싱 기능들을 거쳐서 완료된 렌더링 결과를 풀라우트 캐시라는 이름으로 서버측에 미리 저장
        
        <img width="500" height="300" alt="image" src="https://github.com/user-attachments/assets/e89d427d-6725-4d9a-9132-dfc41c814db2" />

        

- Next.js 앱에 만들어둔 모든 페이지는 자동으로 Static Page와 Dynamic Page로 나뉘어지게 됨
    - 페이지 유형에는 서버 컴포넌트만 영향을 끼침
    - Dynamic Page 설정 기준: 특정 페이지가 접속 요청을 받을 때마다 매번 변화가 생기거나, 데이터가 달라질 경우
        - 캐시되지 않는 Data Fetching을 사용할 경우
        - 동적 함수(쿠키, 헤더, 쿼리스트링)을 사용하는 컴포넌트가 있을 때
    - Static Page 설정 기준: Dynamic Page가 아니면 모두 Static Page가 됨(Default)
        - 풀라우트 캐시 또한 revalidate 가능 → 풀라우트 캐시에 저장이 되도록 설정되어 있다고 하더라도 페이지를 구성하는 컴포넌트들 중 하나의 데이터 페칭 요청이라도 revalidate 옵션이 붙어 있을 경우 설정된 revalidate time에 따라서 데이터 캐시뿐만 아니라 풀라우트 캐시 또한 함께 업데이트 됨
        
        <img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/10d6952d-2cea-4cac-9730-6b1ac07f22d3" />

        

- `generateStaticParams()`
    - 동적 경로를 갖는 페이지를 Static Page로 빌드 타임에 생성되도록 설정하기 위해 export를 붙여 사용
    - 명시하지 않은 값으로 이동하면 dynamic하게 생성
        - `dynamicParams` 의 값을 false로 설정하면 동적으로 생성하지 않음
    - 어떤 URL 파라미터가 빌드 타임에 해당 페이지에 존재할 수 있는지 설정
        - Page Router의 `getStaticPaths` 함수의 App Router 버전
    - 주의사항
        - URL 파라미터 값은 명시할 때에는 문자열 데이터로만 명시
        - 컴포넌트 내부에 데이터 캐싱이 설정되지 않은 데이터 페칭이 존재할지라도 무조건 해당 페이지가 Static Page로 강제 설정됨

- 라우트 세그먼트 옵션(Router Segment Option)
    - 특정 페이지의 동작(caching, revalidate 등)을 강제로 설정
    - 되도록이면 사용하지 않는 것이 권장됨
    
    ```tsx
    export const dynamic = "";
    // 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
    // 1. auto: 기본값, 아무것도 강제하지 않음
    // 2. force-dynamic: 페이지를 강제로 Dynamic 페이지로 설정
    // 3. force-static: 페이지를 강제로 Static 페이지로 설정
    // 4. error: 페이지를 강제로 Static 페이지로 설정하되, 설정하면 안되는 이유가 있다면 에러를 발생
    ```
    

- 클라이언트 라우터 캐시(Client Router Cache)
    - 브라우저에 저장되는 캐시
    - 페이지 이동을 효율적으로 진행하기 위해 한 번 접속한 페이지의 레이아웃을 따로 보관하는 기능
        - Next App에서는 여러 개의 페이지가 공통된 레이아웃을 사용하는 경우, 중복된 데이터를 중복된 RSC 페이로드를 여러 차례 계속해서 브라우저에서 요청하거나 전달받게 된다는 문제점이 발생할 수 있기 때문에 사용
            
            <img width="400" height="500" alt="image" src="https://github.com/user-attachments/assets/1f1c2a53-3b94-4709-97b1-26944b554226" />
