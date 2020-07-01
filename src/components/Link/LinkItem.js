import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import { getDomain } from "../../utils/index";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import FirebaseContext from "../../firebase/context";

function LinkItem({ link, index, showCount, history }) {
  const { firebase, user } = useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push("/login");
    } else {
      const voteRef = firebase.db.collection("links").doc(link.id);
      voteRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          voteRef.update({ votes: updatedVotes });
        }
      });
    }
  }

  function handleDeletelink() {
    const linkRef = firebase.db.collection("links").doc(link.id);
    linkRef
      .delete()
      .then(() => console.log("Document deleted. ID: ", link.id))
      .catch((err) => console.log("error deleting document"));
  }

  const postedByAuthUser = user.uid === link.postBy.id;

  return (
    <div className="flex items-start mt2">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        <div onClick={handleVote} className="vote-button">
          ▲
        </div>
        <div className="ml1">
          <div>
            <a className="black no-underline" href={link.url}>
              {link.description}
            </a>{" "}
            <span className="link">{getDomain(link.url)}</span>
          </div>
          <div className="f6 lh-copy gray">
            {link.votes.length} votes by {link.postBy.name}{" "}
            {distanceInWordsToNow(link.created)} |{" "}
            <Link to={`/link/${link.id}`}>
              {link.comments.length > 0
                ? `${link.comments.length} comments`
                : "Discuss"}
            </Link>
            {postedByAuthUser && (
              <>
                {" | "}
                <span className="delete-button" onClick={handleDeletelink}>
                  Delete
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
