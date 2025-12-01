import { Test, TestingModule } from '@nestjs/testing';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

describe('SnippetsController', () => {
  let controller: SnippetsController;
  let service: SnippetsService;

  const mockSnippetsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnippetsController],
      providers: [
        {
          provide: SnippetsService,
          useValue: mockSnippetsService,
        },
      ],
    }).compile();

    controller = module.get<SnippetsController>(SnippetsController);
    service = module.get<SnippetsService>(SnippetsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a snippet', async () => {
      const createDto = { title: 'Test', code: 'log', language: 'js', userId: 'user1' };
      const req = { user: { userId: 'user1' } };
      const result = { ...createDto, _id: 'id' };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createDto, req)).toBe(result);
      expect(service.create).toHaveBeenCalledWith(createDto, 'user1');
    });
  });

  describe('findAll', () => {
    it('should return array of snippets', async () => {
      const result = [{ title: 'Test' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll({})).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a snippet', async () => {
      const result = { title: 'Test' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne('id')).toBe(result);
      expect(service.findOne).toHaveBeenCalledWith('id');
    });
  });

  describe('update', () => {
    it('should update a snippet', async () => {
      const updateDto = { title: 'Updated' };
      const result = { title: 'Updated' };
      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update('id', updateDto)).toBe(result);
      expect(service.update).toHaveBeenCalledWith('id', updateDto);
    });
  });

  describe('remove', () => {
    it('should remove a snippet', async () => {
      const result = { title: 'Deleted' };
      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove('id')).toBe(result);
      expect(service.remove).toHaveBeenCalledWith('id');
    });
  });
});
