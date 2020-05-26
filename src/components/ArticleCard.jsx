import React from "react";
import { Placeholder, Grid } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <Grid.Row width={3} centered>
      <Placeholder
        fluid
        style={{ height: 300, width: 600 }}
        key={article.id}
        id={"article-" + article.id}
      >
        <Placeholder.Image />

        <Link
          to={{
            pathname: `/article/${article.id}`
          }}
          
        > 
          <h5 id="article-title" style={{ textAlign: "center" }}>{article.title}</h5>
        </Link>
      </Placeholder>
    </Grid.Row>
  );
};

export default ArticleCard;
