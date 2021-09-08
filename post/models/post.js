'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            // MySql에는 users테이블 생성
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false, // 필수 (NotNull)
        
            },
            title: {
                type: DataTypes.STRING(30),
                allowNull: false, // 필수 (NotNull)
 
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false, // 필수 (NotNull)

            },
            hit: {
                type: DataTypes.INTEGER,
                allowNull: false, // 필수 (NotNull)
            
            },

            area: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
        },
        {
          sequelize, //해당 부분에 db.sequelize 객체가 들어간다. 
          timestamps: true,  //true로 하면 createdAt과 updatedAt을 생성한다.
          underscored: false, //기본적으로 테이블명과 컬럼명을 CamelCase로 바꾸는데 snake case로 변경해준다
          modelName: "Post", //모델 이름을 설정할 수있다
          tableName: "Post", //기본적으로 모델이름을 소문자및 복수형으로 만드는데 모델이 User면 users가된다
          paranoid:false, // true로 설정하면 deletedAt 컬럼이 생긴다. 삭제시 완전히 지워지지 않고 deletedAt에 지운시각이 기록된다.
          charset: 'utf8',
          collate: 'utf8_general_ci',
        }
    );
    Post.associate = (db) => {
      db.Post.hasMany(db.Comment, {as: "comment"});
    };

    return Post;
};
