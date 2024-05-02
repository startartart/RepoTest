### 뉴튜브 실전 프로젝트 `'./project-newtube'`

- [회원 API 설계](https://github.com/startartart/RepoTest/pull/8)
- [채널 API 설계](https://github.com/startartart/RepoTest/pull/11)

---
### 뉴튜브 API 설계하기 연습 `'./project-demo-example'`

- **`GET`** `/newtuber/:id`  id로 객체를 찾아 객체의 정보를 전달
    
    **req** : params.id, key값으로 전달
    
    **res** : id로 객체 조회 후 전달
    

- `**GET`** `/newtubers` 전체 뉴튜버 조회
    
    req : 없음
    
    res : 객체 전체 조회
    

- `POST` `/newtuber` 뉴튜버 등록
    
    **req** : body에 `channelTitle`, `sub`, `videoNum` 초기화후 신규 뉴튜버 정보를 전달 및 db에 저장
    
    **res** : `channelTitle님, 뉴튜버가 되신 걸 환영합니다.`

<div>
    [API 테스트 및 GET, POST](https://github.com/startartart/RepoTest/pull/4)
</div>
<div>
    [DELETE API](https://github.com/startartart/RepoTest/pull/5)
</div>
<div>
    [PUT API](https://github.com/startartart/RepoTest/pull/6)
</div>
