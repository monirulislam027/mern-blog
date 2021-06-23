import { Avatar, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { commentLikeUnlike } from '../../../store/actions/author/likeUnlikeAction';
import { creationTime } from '../../utils/timeUtils';
import AllReplies from '../reply/AllReplies';
import ReplyAdd from '../reply/ReplyAdd';
const useStyles = makeStyles({
  commentBody: {
    marginTop: '12px',
  },
  commentDetails: {
    background: '#F3F3F3',
    paddingLeft: ' 10px',
    paddingTop: ' 5px',
    paddingBottom: ' 5px',
    borderRadius: '5px',
  },
  username: {
    fontWeight: 'bold',
  },
  commentFooter: {
    display: 'flex',
    paddingRight: '30px',
    paddingLeft: '10px',
    fontSize: '13px',
    marginTop: '4px',
  },
  footerButton: {
    cursor: 'pointer',
    marginRight: '15px',
  },
  allReplies: {
    marginLeft: '70px',
  },
});

const Comment = ({
  username,
  body,
  profilePic,
  likes,
  replies,
  commentId,
  createdAt,
  userId,
  isAuthenticated,
  commentLikeUnlike,
}) => {
  const classes = useStyles();
  const [allReplies, setAllReplies] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  React.useEffect(() => setIsLiked(likes.includes(userId)), [likes, userId]);

  const commentLikeUnlikeHandle = () => {
    commentLikeUnlike(commentId, userId, (result) => setIsLiked(result));
  };

  return (
    <>
      <Grid container spacing={2} wrap='nowrap' className={classes.commentBody}>
        <Grid item>
          <Avatar src={`http://${profilePic}`} alt={username} />
        </Grid>
        <Grid item style={{ minWidth: '210px' }}>
          <div className={classes.commentDetails}>
            <Typography component='h2' className={classes.username}>
              {username}
            </Typography>
            <Typography component='p' className={classes.body}>
              {body}
            </Typography>
          </div>
          <div className={classes.commentFooter}>
            <p className={classes.footerButton}>
              {likes.length}
              {isAuthenticated ? (
                <span
                  style={{ fontWeight: isLiked ? 'bold' : 'normal' }}
                  onClick={commentLikeUnlikeHandle}
                >
                  {isLiked ? ' Liked' : ' Like'}
                </span>
              ) : (
                <span> Like</span>
              )}
            </p>
            <p
              className={classes.footerButton}
              onClick={() => setAllReplies(!allReplies)}
              style={{ fontWeight: allReplies ? 'bold' : 'normal' }}
            >
              Reply
            </p>
            <p className={classes.footerButton}>{creationTime(createdAt)}</p>
          </div>
        </Grid>
      </Grid>

      {allReplies && (
        <div className={classes.allReplies}>
          <AllReplies replies={replies} />
          <ReplyAdd commentId={commentId} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.user._id,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { commentLikeUnlike })(Comment);
