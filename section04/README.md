## 섹션 4: 데이터 페칭

- 데이터 페칭 in Page Router
    - 서버 측에서 불러온 모든 데이터는 결국 컴포넌트 트리의 최상단에 위치하는 페이지 컴포넌트에게만 props로 전달되기 때문에 최상단 페이지 컴포넌트로부터 데이터를 필요로 하는 말단의 모든 컴포넌트까지 props나 컨텍스트 API 등을 활용해서 넘겨줘야하는 단점이 있음
    
    <img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/e28ed81c-df6e-4ef2-a4ce-8c55b7a1f32f" />
    <img width="400" height="300" alt="image" src="https://github.com/user-attachments/assets/5369819c-225e-4eec-a9e4-e0b75add4f96" />

    

- 데이터 페칭 in App Router
    - 서버 컴포넌트 함수를 async 키워드를 붙여 비동기 함수를 만들고 내부에서 await 키워드와 fetch 메서드를 활용해서 데이터를 직접 불러오도록 하는 데이터 페칭 로직을 작성해도 문제가 발생하지 않음
        - 브라우저에서 실행되지 않기 때문
        
        <img width="400" height="200" alt="image" src="https://github.com/user-attachments/assets/3e09afd9-377b-4279-b598-ea2887ea208a" />
        

- 데이터 캐시(Data Cache)
    - 오직 fetch 메서드를 활용해 불러온 데이터를 Next 서버가 중단되기 전까지 영구적으로 보관하는 기능
    - fetch 함수의 두 번째 인자에 지정
    - 불필요한 데이터 요청 수를 줄여서 웹 서비스의 성능을 크게 개선할 수 있음
    1. `cache: "force-cache"` : 요청의 결과를 무조건 캐싱, 한번 호출 된 이후에 다시는 호출되지 않음
    2. `cache: "no-store"` : 데이터 페칭의 결과를 저장하지 않음, 캐싱을 아예 하지 않는 옵션
    3. `next: { revalidate: n }` : 특정 시간을 주기로 캐시를 업데이트, Page Router의 ISR 방식과 유삼
    4. `next: { tags: ['a'] }` : On-Demand Revalidate, 요청이 들어왔을 때 데이터를 최신화

- 리퀘스트 메모이제이션(Request Memoization)
    - 하나의 페이지를 서버 측에서 렌더링하는 과정에서 발생된 중복된 API 요청들을 자동으로 캐싱
    - 하나의 페이지 렌더링이 끝나면 메모이제이션된 모든 캐시가 즉시 소멸
        - 데이터 캐시는 서버가 중단되기 전까지는 영구적으로 보관됨
