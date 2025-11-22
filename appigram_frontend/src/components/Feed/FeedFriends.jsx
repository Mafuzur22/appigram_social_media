import React from 'react';

export default function FeedFriends() {
  return (
    <div className="_feed_right_inner_area_card _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_feed_top_fixed">
        <div className="_feed_right_inner_area_card_content _mar_b24">
          <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
        </div>
        <div className="_feed_right_inner_area_card_ppl">
          <div className="_feed_right_inner_area_card_ppl_box">
            <div className="_feed_right_inner_area_card_ppl_image">
              <a href="/profile">
                <img src="/assets/images/profile.png" alt="Friend" className="_card_ppl_img" />
              </a>
            </div>
            <div className="_feed_right_inner_area_card_ppl_txt">
              <a href="/profile">
                <h4 className="_feed_right_inner_area_card_ppl_title">Dylan Field</h4>
              </a>
              <p className="_feed_right_inner_area_card_ppl_para">CEO of Figma</p>
            </div>
          </div>
          {/* Add more friends as needed */}
        </div>
      </div>
    </div>
  );
}
