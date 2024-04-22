import { useEffect, useReducer, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import Modal from './Modal';
/*
--------------- PROPERTIES ------------------------------
.error Erro que ocorreu no processo de leitura do arquivo.

.readyState represents the stages of the reader process.
0 = EMPTY | 1= LOADING | 2 = DONE

.result will be only avaliable in stage 2.

--------------- EVENTS ----------------------------------
Stage 0: onloadstart
reader.onloadstart = (e) => console.log('Load started.');

Stage 1: onload
reader.onload = (e) => handler(e);

Stage 2: onloadend
reader.onloadend = (e) => handler(e);

Progress: 
reader.onprogress = (e) => handler(e);
*/

function stopDefaultBehavior(e) {
  e.stopPropagation();
  e.preventDefault();
}

const initialState = {
  //idle | loading | ended
  readerStatus: 'idle',
  imgSrc: [],
  images: [],
  imageSelected: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'imageUpload':
      console.log('An image was selected!');
      return { ...state, images: action.payload };

    case 'loadStarts':
      console.log('Started loading image buffer');
      return { ...state, readerStatus: 'loading' };

    case 'loadEnds':
      console.log('Ended loading image buffer');
      return {
        ...state,
        readerStatus: 'idle',
        imgSrc: [...state.imgSrc, action.payload],
      };

    case 'imageSelected':
      return {
        ...state,
        imageSelected: action.payload,
      };
    default:
      throw new Error('unknow action damn');
  }
}

function ImageUploader() {
  const [states, dispatch] = useReducer(reducer, initialState);

  const [isOpenModal, setIsOpenModal] = useState(false);

  // const handleStart = () => dispatch({ type: 'loadStarts' });
  const handleEnd = (e) => {
    dispatch({ type: 'loadEnds', payload: e.target.result });
  };

  function renderImgBuffer(files) {
    const filesArr = Object.values(files);

    const readers = Array.from(filesArr, () => new FileReader());

    readers.forEach((reader) => reader.addEventListener('loadend', handleEnd));

    filesArr.forEach((file, ind) => readers[ind].readAsDataURL(file));
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      <FileInput />
      <DropLabelArea
        dispatch={dispatch}
        stopDefaultBehavior={stopDefaultBehavior}
        renderImgBuffer={renderImgBuffer}
      />
      {states.imgSrc.length > 0 && (
        <UploadedSwiper>
          {states.imgSrc.map((src, ind) => {
            return (
              <SwiperSlide
                className="w-full max-h-[250px] overflow-hidden flex flex-col justify-center items-center bg-orange-300"
                key={src}
                onClick={() => {
                  setIsOpenModal(true);
                  dispatch({
                    type: 'imageSelected',
                    payload: {
                      image: states.images[ind],
                      src: src,
                    },
                  });
                }}
              >
                <img src={src} className="w-full" />
              </SwiperSlide>
            );
          })}
        </UploadedSwiper>
      )}
      <Modal isOpenModal={isOpenModal} onOpenModal={setIsOpenModal}>
        <img src={states.imageSelected.src} />
      </Modal>
    </div>
  );
}

function UploadedSwiper({ children }) {
  return (
    <Swiper
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      loop={true}
      modules={[EffectCreative]}
      className="w-full markup"
    >
      {children}
    </Swiper>
  );
}

function FileInput({ dispatch }) {
  return (
    <input
      type="file"
      multiple={true}
      onChange={(e) => {
        dispatch({
          type: 'imageUpload',
          payload: Object.values(e.target.files),
        });
      }}
      className="hidden"
      id="fileInput"
    />
  );
}

function DropLabelArea({ stopDefaultBehavior, renderImgBuffer, dispatch }) {
  return (
    <label
      className="w-[90%] text-center h-[150px] border-dashed border border-blue-500 flex flex-col justify-center items-center"
      onDrop={(e) => {
        stopDefaultBehavior(e);
        dispatch({ type: 'imageUpload', payload: e.dataTransfer.files });
        renderImgBuffer(e.dataTransfer.files);
      }}
      htmlFor="fileInput"
      onDragEnter={stopDefaultBehavior}
      onDragOver={stopDefaultBehavior}
    >
      <span>Drop your files here</span>
    </label>
  );
}

export default ImageUploader;
