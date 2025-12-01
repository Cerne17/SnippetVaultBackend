import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsService } from './snippets.service';
import { getModelToken } from '@nestjs/mongoose';
import { Snippet } from './schemas/snippet.schema';

describe('SnippetsService', () => {
  let service: SnippetsService;
  let model: any;

  const mockSnippet = {
    _id: 'someId',
    title: 'Test Snippet',
    code: 'console.log("hello")',
    language: 'javascript',
    userId: 'user1',
    save: jest.fn().mockResolvedValue({
      _id: 'someId',
      title: 'Test Snippet',
      code: 'console.log("hello")',
      language: 'javascript',
      userId: 'user1',
    }),
  };

  const mockSnippetModel = jest.fn().mockImplementation(() => mockSnippet);
  (mockSnippetModel as any).find = jest.fn();
  (mockSnippetModel as any).findOne = jest.fn();
  (mockSnippetModel as any).findById = jest.fn();
  (mockSnippetModel as any).findByIdAndUpdate = jest.fn();
  (mockSnippetModel as any).findByIdAndDelete = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnippetsService,
        {
          provide: getModelToken(Snippet.name),
          useValue: mockSnippetModel,
        },
      ],
    }).compile();

    service = module.get<SnippetsService>(SnippetsService);
    model = module.get(getModelToken(Snippet.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new snippet', async () => {
      const userId = 'user1';
      const createDto = { title: 'Test Snippet', code: 'console.log("hello")', language: 'javascript', userId };

      const result = await service.create(createDto, userId);

      expect(mockSnippetModel).toHaveBeenCalledWith({ ...createDto, userId });
      expect(result).toEqual(expect.objectContaining(createDto));
    });
  });

  describe('findAll', () => {
    it('should return an array of snippets', async () => {
      (model.find as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue([mockSnippet]),
      });

      const result = await service.findAll({});

      expect(model.find).toHaveBeenCalled();
      expect(result).toEqual([mockSnippet]);
    });
  });

  describe('findOne', () => {
    it('should return a snippet by id', async () => {
      (model.findOne as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSnippet),
      });

      const result = await service.findOne('someId');

      expect(model.findOne).toHaveBeenCalledWith({ _id: 'someId', deletedAt: null });
      expect(result).toEqual(mockSnippet);
    });
  });

  describe('update', () => {
    it('should update a snippet', async () => {
      const updateDto = { title: 'Updated Title' };
      (model.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockSnippet, ...updateDto }),
      });

      const result = await service.update('someId', updateDto);

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', updateDto, { new: true });
      expect(result.title).toEqual('Updated Title');
    });
  });

  describe('remove', () => {
    it('should soft delete a snippet', async () => {
      (model.findByIdAndUpdate as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockSnippet),
      });

      const result = await service.remove('someId');

      expect(model.findByIdAndUpdate).toHaveBeenCalledWith('someId', expect.objectContaining({ deletedAt: expect.any(Date) }), { new: true });
      expect(result).toEqual(mockSnippet);
    });
  });
});
